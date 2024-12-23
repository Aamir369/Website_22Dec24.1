function videopage({ children }) {
  return (
    <>
      <video className="h-full w-full rounded-lg" controls autoPlay>
        <source src="/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <main className=" min-h-screen py-24">{children}</main>
    </>
  );
}

export default videopage;
