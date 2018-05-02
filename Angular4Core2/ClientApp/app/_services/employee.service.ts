import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employee } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class EmployeeService {

    private _getEmployeesUrl = "/Employee/GetAllEmployees";
    public _saveUrl: string = '/Employee/SaveEmployee/';
    //public _updateUrl: string = '/Employee/UpdateEmployee/';
    public _deleteByIdUrl: string = '/Employee/DeleteEmployee/';

    constructor(private http: Http) { }

    getEmployees() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getEmployeesUrl = this._getEmployeesUrl;
        return this.http.get(getEmployeesUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    //Post
    saveEmployee(employee: Employee): Observable<string> {
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._saveUrl, body, options)
            .map(res => res.json().message)
            .catch(this.handleError);
    }

    //Delete
    deleteEmployee(id: string): Observable<string> {
        //debugger
        var deleteByIdUrl = this._deleteByIdUrl + '/' + id

        return this.http.delete(deleteByIdUrl)
            .map(response => response.json().message)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        return Observable.throw(error.json().error || 'Opps!! Server error');
    }


}