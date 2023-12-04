import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, updateDoc, doc, getDoc, addDoc, collection, collectionData, query } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';
import { AngularFireDatabase, PathReference, AngularFireObject } from '@angular/fire/compat/database';
import { Product } from '../models/product.model';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  database = inject(AngularFireDatabase)
  utilsService = inject(UtilsService);
  storage = inject(AngularFireStorage);

  uploadProductImages(productID: string, images: FileList) {
    const imageUrls = {};

    for(let i = 0; i < images.length; i++) {
      const file = images.item(i);
      const filePath = `products/${productID}/${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            imageUrls[`image${i + 1}`] = url;
            this.database.object(`products/${productID}/images`).update(imageUrls);
          })
        })
      ).subscribe();

    }
  }

  getDB() {
    return this.database.list<any>('products').valueChanges();
  }
  addProduct(product: any) {
    let idProduct = this.database.createPushId();
    return this.database.list('products').push(product).child(idProduct);
  }
  updateProduct(product: any, id: any) {
    
    // return this.database.
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

  getCollectionData(path: string, collecctionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, collecctionQuery), {idField: 'id'});
  }

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
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

  async uploadImages(path: string, data_url: any) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }

  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath
  }

}
