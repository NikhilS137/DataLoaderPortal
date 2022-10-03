import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderPortalService {

  baseUrl = 'https://localhost:7271/';

  constructor(private https: HttpClient) { }

//File Upload
FileUpload(val:any):Observable<any>{
  console.log(this.baseUrl + "FileUpload");
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  // return this.https.post<any>("https://localhost:7127/api/FileUpload",val).pipe(catchError(this.handleError));
  return this.https.post<any>("https://localhost:7271/FU/File",val,{headers : headers}).pipe(catchError(this.handleError));
}

// Login WebAPI
fu(val:any):Observable<any[]>{
  return this.https.post<any>(this.baseUrl + "FU/File",val);
}


  // Login WebAPI
  Login(val:any):Observable<any[]>{
    return this.https.post<any>(this.baseUrl + "Login",val).pipe(catchError(this.handleError));
}

  //Get File Upload Log
  FileUploadList():Observable<any[]>{
    return this.https.get<any[]>(this.baseUrl + "GetFileUploadList").pipe(catchError(this.handleError));
  }

  //Get Patient Log
  PatientList():Observable<any[]>{
    return this.https.get<any[]>(this.baseUrl + "GetPatientList").pipe(catchError(this.handleError));
  }

  //Get Patient Details By Name
  GetPatientDetailsByName(name:any):Observable<any[]>{
    console.log(this.baseUrl + "GetPatientDetailsByName/"+name);
    return this.https.get<any[]>(this.baseUrl + "GetPatientDetailsByName?name="+name).pipe(catchError(this.handleError));
  }

   //Update Patient Details
   UpdatePatientDetails(id:number,val:any):Observable<any[]>{
    return this.https.put<any[]>(this.baseUrl + "UpdatePatientDetails/"+id,val).pipe(catchError(this.handleError));
  }

  //Update Patient  Status Details
  UpdatePatientStatus(id:number,status:string):Observable<any[]>{
    return this.https.put<any[]>(this.baseUrl + "UpdateStatus/"+id+ "/"+ status,null).pipe(catchError(this.handleError));
  }


handleError(error: HttpErrorResponse) {
  return throwError(error);
}

  


}
