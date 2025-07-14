import { SetStateAction } from "react";
import cookie from 'cookie';
import { NextPageContext } from 'next';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(value: string | number | Date) {
  const date = new Date(value)
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}

export function getBase64(file: Blob, callback: any) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result)
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export async function converteBase64toURL(base64: string, setState: { (value: SetStateAction<string>): void; (arg0: string): void; }) {
  const base64Response = await fetch(base64);
  const blob = await base64Response.blob();
  const objectUrl = URL.createObjectURL(blob)
  setState(objectUrl)
}

export function isEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true)
  }
  return false
}

export function convertMinuteToHour(minute: number) {
  const hour = Math.floor(minute / 60)
  const min = minute % 60
  return `${hour}h${min === 0 ? '' : min}`
}

export function parseCookies({ req }: NextPageContext) {
  return cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}