import { getDoc, getDocs, collection, updateDoc, deleteDoc, addDoc, query, where, db, doc } from "./firebaseConfig";
import User  from "@/store/userStore";

const collectionName = 'users';

export const createUser = async (user: User) => {
    const colRef = collection(db, collectionName);
    const data = await addDoc(colRef, user);
    return data.id;
};


// UPDATE
export const updateUser = async (id: string, user: Partial<User>) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, user);
};


// READ
export const getUsers= async ()  => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

// READ WITH WHERE
export const getUsersByCondition = async (camp: string, value: string | number | boolean) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where(camp, "==", value)));
    return getArrayFromCollection(result);
};

export const getUserById = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data();
};

// DELETE
export const deleteUser = async (id: string) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
};

const getArrayFromCollection = (collection: any) => {
    return collection.docs.map((doc: any) => {
        return { ...doc.data(), id: doc.id };
    });
};
