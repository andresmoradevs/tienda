import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from '@angular/fire/auth';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, updateDoc, doc, getDoc, addDoc, collection, collectionData, query } from '@angular/fire/firestore';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, update  } from 'firebase/database';

import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private dbPath = '/products';
  products: Product[];

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  database = inject(AngularFireDatabase);
  utilsService = inject(UtilsService);
  storage = inject(AngularFireStorage);

  addProductFromRealtime(product: Product): any {
    return this.database.list(this.dbPath).push(product);
  }

  // Obtener un producto por su ID
  getProductByIdFromRealtime(id: string): Observable<Product | null> {
    return this.database.object<Product>(`${this.dbPath}/${id}`).valueChanges();
  }
   // Obtener todos los productos
   getProductsFromRealtime() {
    return this.database.list('/productos').valueChanges();
  }

  // Actualizar un producto
  updateProductFromRealtime(id: string, product: Product): Promise<void> {
    return this.database.object(`${this.dbPath}/${id}`).update(product);
  }

  // Eliminar un producto
  deleteProductFromRealtime(id: string): Promise<void> {
    return this.database.object(`${this.dbPath}/${id}`).remove();
  }


  

  getAuth() {
    return getAuth();
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsService.routerLink('/auth')
  }
  
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }
  
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }
  // Database Realtime

  
  
  // Database Firestore

  getCollectionData(path: string, collecctionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collecctionQuery), {idField: 'id'});
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data)
  }
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data)
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }

  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath
  }

}
