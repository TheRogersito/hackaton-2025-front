import { getDoc, getDocs, collection, updateDoc, deleteDoc, addDoc, query, where, db, doc } from "./firebaseConfig";

const collectionName = 'users';

// CREATE
export const createUser = async(user) => {
    const colRef = collection(db, collectionName);
    const data = await addDoc(colRef, user);
    return data.id;
}

// UPDATE
export const updateUser = async (id, user) => {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, user)
}

// READ
export const getUsers= async ()  => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getUsersByCondition = async (camp, value) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where(camp, '==', value)));
    return getArrayFromCollection(result);
}

export const getUserById = async (id) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data();
}

// DELETE
export const deleteUser = async (id) => {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}