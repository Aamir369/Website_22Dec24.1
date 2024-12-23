import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as FLHA from "./constant_titles";
import { getStorage, ref, getDownloadURL } from "firebase/storage";


const dateTimeConversion = (timestamp) => {
  const seconds = timestamp.seconds;
  const nanoseconds = timestamp.nanoseconds;
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const formattedDate = date.toISOString().split("T")[0];
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return `${formattedDate} ${timeFormatter.format(date)}`;
};



const fetchImageAsBase64 = async (firebasePath) => {
  const storage = getStorage();
  const storageRef = ref(storage, firebasePath);

  try {
    const url = await getDownloadURL(storageRef);

    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Error fetching image: ${error.message}`);
    return null;
  }
};

const formatDate = (dateTimeString) => {
  const [datePart, timePart] = dateTimeString.split(" ");
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year}\n${timePart}`;
};

const preloadCompanyLogo = async (logo) => {
  try {
    const image = await fetchImageAsBase64(logo);
    return image;
  } catch (error) {
    console.error("Error preloading company logo:", error);
    return null;
  }
};


const preloadImages = async (signatures) => {
  const images = await Promise.all(
    signatures.map(async (signature) => await fetchImageAsBase64(signature))
  );
  return images;
};

export const exportToPDF = async (data, fileName, table, signatures, currentCompanyData, currentUserData) => {
  const companyLogo = await preloadCompanyLogo(currentCompanyData.logo);
  const images = table === "flha" ? await preloadImages(signatures) : null;
  const headers = table === "flha" ? [
    "Name & Email",
    "Submitted Date and Time",
    "PPE Inspected",
    "Environmental Hazards (Flhf)",
    "Ergonomics Hazards",
    "Access/Egress Hazards",
    "Overhead/Underground Hazards",
    "Equipment/Vac Truck Hazards",
    "Personal Limitations Hazards",
    "All Hazard Remaining",
    "All Permits Closed Out",
    "Any Incident",
    "Area Cleaned Up At End",
    "Master Point Location",
    // "Signature",
  ] : ["FullName", "Email", /* Add other headers */ ];

  const formattedData = table === "flha" ? data.map(flha => [
    `${flha.user_name}\n${flha.user_email}`,
    formatDate(dateTimeConversion(flha.submitted_at)),
    flha.data.ppe_inspected ? "True" : "False",
    flha.data.flhf.map((item, index) => `${FLHA.environmentalHazards[index]}: ${item ?? 'N/A'}`).join("\n"),
    flha.data.ergonomics.map((item, index) => `${FLHA.ergonomicsHazards[index]}: ${item ?? 'N/A'}`).join("\n"),
    flha.data.aeHazards.map((item, index) => `${FLHA.accessEgressHazards[index]}: ${item ?? 'N/A'}`).join("\n"),
    flha.data.ouHazards.map((item, index) => `${FLHA.overHeadUnderGroundHazards[index]}: ${item ?? 'N/A'}`).join("\n"),
    flha.data.plHazards.map((item, index) => `${FLHA.personalLimitationsHazards[index]}: ${item ?? 'N/A'}`).join("\n"),
    flha.data.job_completion?.all_hazard_remaining ? "True" : "False" ?? 'N/A',
    flha.data.job_completion?.all_permits_closed_out ? "True" : "False" ?? 'N/A',
    flha.data.job_completion?.any_incident ? "True" : "False" ?? 'N/A',
    flha.data.job_completion?.area_cleaned_up_at_end ? "True" : "False" ?? 'N/A',
    // flha.data.master_point_location ?? 'N/A',
    null,
    // { content: flha.data?.signature_url, type: "image"}// Use null if there's no image
  ]) : data.map(user => [
    user.fullName,
    user.email,
    // Map other fields similarly
  ]);

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  doc.setFontSize(6);
  doc.addImage(companyLogo, "JPEG", 10, 10, 20, 10);
  doc.text(`Company Name: ${currentCompanyData.name ?? 'N/A'}`, 10, 25);
  doc.text(`Report Printed By: ${currentUserData.fullName ?? 'N/A'}`, 10, 30);

  autoTable(doc, {
    head: [headers],
    body: formattedData,
    startY: 45,
    theme: "grid",
    headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontSize: 6,
        fontStyle: "bold",
        valign: "middle",
        halign: "center",
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
        textColor: 50,
        fontSize: 4,
        valign: "top",
        halign: "left",
        overflow: "linebreak",
      },
      didDrawCell: (data) => {
        if (
          table === "flha" &&
          data.column.index === headers.length - 1 &&
          data.row.index >= 0
        ) {
          const imageIndex = data.row.index;
          const imageBase64 = images[imageIndex];
          if (imageBase64) {
            const cellWidth = data.cell.width;
            const cellHeight = data.cell.height;
            const x = data.cell.x;
            const y = data.cell.y + 12;
            doc.addImage(imageBase64, "JPEG", x, y, cellWidth, cellHeight / 2);
          }
        }
      },
    alternateRowStyles: { fillColor: [255, 255, 255] },
    columnStyles: { 0: { halign: 'left' }, 1: { halign: 'left' }, 2: { halign: 'left' } },
    pageBreak: 'auto',
  });

  // Adding footer with page numbers
  const pageCount = doc.internal.getNumberOfPages();
  doc.setFontSize(6);
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width / 2, doc.internal.pageSize.height - 10, { align: "center" });
  }

  doc.save(`${fileName}.pdf`);
};