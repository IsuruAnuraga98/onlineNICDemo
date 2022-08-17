import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { HttpHeaders } from "@angular/common/http";
import { AESEncryptDecryptService } from './AESEncryptDecryptService.service'; 

@Injectable({
  providedIn: 'root'
})

export class DataService {
  headers = new HttpHeaders();
  constructor(private httpClient:HttpClient,public _AESEncryptDecryptService: AESEncryptDecryptService) { }

  getData(){
     return this.httpClient.get('https://nicsystem.test/index');
   }

   getUserData(){
    return this.httpClient.get('https://nicsystem.test/allusers');
  }

  updateUserData(id,role){
    return this.httpClient.get('https://nicsystem.test/updateusers/'+id+'/'+role);
  }

   getDataLevel2(){
    return this.httpClient.get('https://nicsystem.test/stage2index');
  }

  getDataLevel3(){
    return this.httpClient.get('https://nicsystem.test/stage3index');
  }

  getDataLevel4(){
    return this.httpClient.get('https://nicsystem.test/stage4index');
  }

  getDataLevel5(){
    return this.httpClient.get('https://nicsystem.test/stage5index');
  }

  getDataLevel6(){
    return this.httpClient.get('https://nicsystem.test/stage6index');
  }

  getPoliceReport(data){
    return this.httpClient.get('https://nicsystem.test/getPoliceReport/'+data);
  }

  getPeaceReport(data){
    return this.httpClient.get('https://nicsystem.test/getPeaceReport/'+data);
  }

  getPhoto(data){
    return this.httpClient.get('https://nicsystem.test/getPhoto/'+data);
  }
 
   insertData(data){

    data.emailsent = data.email;
    data.name = this._AESEncryptDecryptService.encrypt(data.name);
    data.email = data.email;
    data.firstName = this._AESEncryptDecryptService.encrypt(data.firstName);
    data.lastName = this._AESEncryptDecryptService.encrypt(data.lastName);
    data.address = this._AESEncryptDecryptService.encrypt(data.address);
    data.city = this._AESEncryptDecryptService.encrypt(data.city);
    data.province = this._AESEncryptDecryptService.encrypt(data.province);
    data.postalCode = this._AESEncryptDecryptService.encrypt(data.postalCode);

     const headers= new HttpHeaders()
     .set('content-type', 'application/json')
     .set('Access-Control-Allow-Origin', '*');
    
     return this.httpClient.post('https://nicsystem.test/create', data, { 'headers': headers });
   }
 
   loginUser(data){
     const headers= new HttpHeaders()
     return this.httpClient.post('https://nicsystem.test/login', data, { 'headers': headers });
   }

   logOut(data){
    const headers= new HttpHeaders()
    return this.httpClient.post('https://nicsystem.test/logout', data, { 'headers': headers });
  }

   registerUser(data){
    const headers= new HttpHeaders()
    return this.httpClient.post('https://nicsystem.test/register', data, { 'headers': headers });
  }

   updateRequest(data){
    const headers= new HttpHeaders()
    return this.httpClient.post('https://nicsystem.test/edit', data, { 'headers': headers });
  }

  updateRequestError(data){
    const headers= new HttpHeaders()
    return this.httpClient.post('https://nicsystem.test/markError', data, { 'headers': headers });
  }

  updateRequestl2(data){
    const headers= new HttpHeaders()
    data.emailsent = this._AESEncryptDecryptService.decrypt(data.email);
    return this.httpClient.post('https://nicsystem.test/editl2', data, { 'headers': headers });
  }

  updateRequestl3(data){
    const headers= new HttpHeaders()
    data.emailsent = this._AESEncryptDecryptService.decrypt(data.email);
    return this.httpClient.post('https://nicsystem.test/editl3', data, { 'headers': headers });
  }

  searchRequestFromMail(data){
    const headers= new HttpHeaders()
    return this.httpClient.get('https://nicsystem.test/searchRequestFromMail/'+data, { 'headers': headers });
  }

   getUser(){
    const headers= new HttpHeaders()
    return this.httpClient.get('https://nicsystem.test/getuser', { 'headers': headers });
  }

  uploadImage(data){
    const headersData = new HttpHeaders({'Content-Type':'multipart/form-data; charset=utf-8'});
    console.log(headersData);
    return this.httpClient.post('https://nicsystem.test/upload',data, {headers: headersData});
  }

  generatebarCode(data){
    const headers= new HttpHeaders()
    return this.httpClient.get('https://nicsystem.test/generatebarcode/'+data, { 'headers': headers });
  }

}
