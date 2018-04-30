import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Location } from '../_models/index';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";

@Injectable()
export class LocationService {

    private _getLocationsUrl = "/Location/GetLocations";
    public _saveUrl: string = '/Location/SaveLocation/';
    public _updateUrl: string = '/Location/UpdateLocation/';
    public _deleteByIdUrl: string = '/Location/DeleteLocationByID/';

    private _getSelfInfoLocationsUrl = "/Location/GetSelfInfoLocations";
    private _getSelfInfoEmployersUrl = "/Location/GetSelfInfoEmployers";

    private _getEmployersUrl = "/Location/GetAllEmployers";

    constructor(private http: Http) { }

    getLocations() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getLocationsUrl = this._getLocationsUrl;
        return this.http.get(getLocationsUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    getSelfInfoLocations() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getSelfInfoLocationsUrl = this._getSelfInfoLocationsUrl;
        return this.http.get(getSelfInfoLocationsUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    getSelfInfoEmployers() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getSelfInfoEmployersUrl = this._getSelfInfoEmployersUrl;
        return this.http.get(getSelfInfoEmployersUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    getAllEmployers() {
        var headers = new Headers();
        headers.append("If-Modified-Since", "Tue, 24 July 2017 00:00:00 GMT");
        var getEmployersUrl = this._getEmployersUrl;
        return this.http.get(getEmployersUrl, { headers: headers })
            .map(response => <any>(<Response>response).json());
    }

    //Post
    saveLocation(location: Location): Observable<string> {
        let body = JSON.stringify(location);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this._saveUrl, body, options)
            .map(res => res.json().message)
            .catch(this.handleError);
    }

    //Delete
    deleteLocation(id: number): Observable<string> {
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