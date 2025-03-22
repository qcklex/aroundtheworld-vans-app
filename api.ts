import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc,
  query,
  where,
  DocumentData,
  Query
} from "firebase/firestore";

export interface Van {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  type: string;
  hostId?: string;  
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

export interface ApiError {
  message: string;
  statusText: string;
  status: number;
}

const firebaseConfig = {
  apiKey: "AIzaSyAv7-v83zIUh_bFk6HvR5-p4oVFgzCr_5A",
  authDomain: "vanlifeapp-c8118.firebaseapp.com",
  projectId: "vanlifeapp-c8118",
  storageBucket: "vanlifeapp-c8118.firebasestorage.app",
  messagingSenderId: "318169203864",
  appId: "1:318169203864:web:29903f7ee8931ba74b3ced",
  measurementId: "G-P5YB6VWSLF"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersCollectionRef = collection(db, "users");
const vansCollectionRef = collection(db, "vans");

export async function getVans(filter?: string): Promise<Van[]> {  
  try {
    let q: Query<DocumentData> = vansCollectionRef;
    if (filter) {
      q = query(vansCollectionRef, where("type", "==", filter));
    }
    const querySnapshot = await getDocs(vansCollectionRef);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Van[];
  } catch (error) {
    console.error('Error fetching vans:', error);
    return [];
  }
}

export async function getVan(id: string): Promise<Van | null> {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  
  if (!snapshot.exists()) {
    return null;
  }
  
  return {
    ...snapshot.data(),
    id: snapshot.id
  } as Van;
}

export async function getHostVans(hostId?: string): Promise<Van[]> {
  try {
    const q = query(
      vansCollectionRef,
      where("hostId", "==", hostId || "123")
    );
    
    console.log('Fetching vans for hostId:', hostId || "123");
    
    const querySnapshot = await getDocs(q); 
    
    console.log('Found vans:', querySnapshot.size);
    
    const vans = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Van[];
    
    console.log('Processed vans:', vans);
    return vans;
    
  } catch (error) {
    console.error('Error in getHostVans:', error);
    throw error; 
  }
}

export async function loginUser(creds: LoginCredentials): Promise<LoginResponse> {
  if (creds.email === "discovery@world.com" && creds.password === "12032001") {
    return {
      user: {
        id: "discovery123",
        email: "discovery@world.com",
        name: "Test User"
      },
      token: "mock-token-123"
    };
  }

  throw {
    message: "Invalid credentials",
    statusText: "UNAUTHORIZED",
    status: 401
  } as ApiError;
}

export function handleFirebaseError(error: any): ApiError {
  return {
    message: "Authentication bypassed",
    statusText: "OK",
    status: 200
  };
}

