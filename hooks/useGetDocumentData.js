import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/firebaseInit';
import { doc, getDoc } from 'firebase/firestore';

export const useGetDocumentData = (documentPath) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!db) throw new Error('Firestore instance is not initialized.');
        
        const docRef = doc(db, documentPath);
        console.log(`Fetching document: ${documentPath}`);
        const docSnapshot = await getDoc(docRef);

        if (isMounted) {
          if (docSnapshot.exists()) {
            console.log("Document data:", docSnapshot.data());
            setData({ id: docSnapshot.id, ...docSnapshot.data() });
          } else {
            console.log("Document does not exist.");
            setData(null);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching document:", err);
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [documentPath]);

  return { data, loading, error };
};