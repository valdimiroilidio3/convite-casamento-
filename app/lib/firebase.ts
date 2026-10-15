/**
 * Inicialização do Firebase (Firestore) para o RSVP.
 *
 * Este módulo importa o SDK e, por isso, deve ser carregado de forma
 * dinâmica (`await import('@/lib/firebase')`) — assim o Firebase fica
 * fora do bundle inicial do site.
 *
 * As variáveis NEXT_PUBLIC_FIREBASE_* vêm de .env.local (veja .env.example).
 * Enquanto não configuradas, o site funciona em modo demonstração e o
 * RSVP é salvo apenas no navegador (localStorage).
 */
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig, isFirebaseConfigured } from './firebase-flags';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export { app, db, isFirebaseConfigured };
