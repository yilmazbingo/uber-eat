// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import { getAuth, UserCredential } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
export const loginRequest = async (
  email: string,
  password: string
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);
// .catch((error) => console.log(error.message));
