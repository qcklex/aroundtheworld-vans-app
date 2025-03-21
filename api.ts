// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  getDoc 
} from "firebase/firestore";

// Define types for our data
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

export async function getVans(id?: string): Promise<Van | Van[]> {
  try {
    const url = id ? `/api/vans/${id}` : '/api/vans';
    const response = await fetch(url);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Van not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
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

export async function getHostVans(id?: string): Promise<Van[]> {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw {
        message: "Failed to fetch vans",
        statusText: res.statusText,
        status: res.status
      } as ApiError;
    }
    const data = await res.json();
    return data.vans as Van[];
  } catch (error) {
    throw error;
  }
}

export async function loginUser(creds: LoginCredentials): Promise<LoginResponse> {
  try {
    const res = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify(creds)
    });
    
    const data = await res.json();

    if (!res.ok) {
      throw {
        message: data.message,
        statusText: res.statusText,
        status: res.status
      } as ApiError;
    }

    return data as LoginResponse;
  } catch (error) {
    throw error;
  }
}