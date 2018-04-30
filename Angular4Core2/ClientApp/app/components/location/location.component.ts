import { Component, OnInit } from '@angular/core';
import { Location, Employer } from '../../_models/index';
import { LocationService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, DropdownModule } from 'primeng/primeng';

class LocationInfo implements Location {
    constructor(
        public locationID?,
        public erpEmployerID?,
        public name?,
        public address1?,
        public address2?,
        public city?,
        public state?,
        public zip?,
        public country?,
        public active?,
        public adCountryCode?,
        public adCountryAbrv?) { }
}

interface SelfInfoLocations {
    locationID: string;
}

interface SelfInfoEmployers {
    employerID: string;
}

class SelfInfoLocationsForDD{
    label: string;
    value: string;

    constructor(item: SelfInfoLocations) {
        this.label = item.locationID;
        this.value = item.locationID;
    }
}

class SelfInfoEmployersForDD {
    label: string;
    value: string;

    constructor(item: SelfInfoEmployers) {
        this.label = item.employerID;
        this.value = item.employerID;
    }
}

class EmployersForDD {
    label: string;
    value: string;

    constructor(item: Employer) {
        this.label = item.employerName;
        this.value = item.erpEmployerID;
    }
}

@Component({
    selector: 'location',
    templateUrl: './location.component.html'
})
export class LocationComponent implements OnInit {

    //properties
    private rowData: any[];
    private selfInfoLocations: SelfInfoLocationsForDD[];
    private selfInfoEmployers: SelfInfoEmployersForDD[];
    private employers: EmployersForDD[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;
    newLocation: boolean;
    location: Location = new LocationInfo();
    locations: Location[];
    public editLocationId: any;
    public fullname: string;

    //constructor
    constructor(private locationService: LocationService, private toastrService: ToastrService) {
    }

    //sample data
    selfInfoLocationData = [
        { "value": "PE", "label": "PE" },
        { "value": "XXX", "label": "XXX" },
        { "value": "TCGBO", "label": "TCGBO" },
        { "value": "AP1", "label": "AP1" },
        { "value": "STCLS", "label": "STCLS" },
        { "value": "ADLOC", "label": "ADLOC" }]

    //methods
    ngOnInit() {
        this.editLocationId = 0;
        this.loadData();
        this.loadSelfInfoLocations();
        this.loadEmployers();
    }

    loadData() {
        this.locationService.getLocations()
            .subscribe(res => {
                this.rowData = res.result;
            });
    }

    loadSelfInfoLocations()
    {
        this.locationService.getSelfInfoLocations()
            .subscribe(res => {
                this.selfInfoLocations = res.result.map(item => new SelfInfoLocationsForDD(item));
            });
        
    }

    loadSelfInfoEmployers() {
        this.locationService.getSelfInfoEmployers()
            .subscribe(res => {
                this.selfInfoEmployers = res.result.map(item => new SelfInfoEmployersForDD(item));
            });
    }

    loadEmployers() {
        this.locationService.getAllEmployers()
            .subscribe(res => {
                // The 1st callback handles the data emitted by the observable.
                this.employers = res.result.map(item => new EmployersForDD(item));
                },
                // The 2nd callback handles errors.
                (err) => { this.toastrService.warning(err); console.log(err); },
                // The 3rd callback handles the "complete" event.
                () => console.log("observable complete")
            );
    }

    //click events
    showDialogToAdd() {
        this.newLocation = true;
        this.editLocationId = 0;
        this.location = new LocationInfo();
        this.displayDialog = true;
    }


    showDialogToEdit(location: Location) {
        this.newLocation = false;
        this.location = new LocationInfo();
        this.location.locationID = location.locationID;
        this.location.erpEmployerID = location.erpEmployerID;
        this.location.name = location.name;
        this.location.address1 = location.address1;
        this.location.address2 = location.address2;
        this.location.city = location.city;
        this.location.state = location.state;
        this.location.zip = location.zip;
        this.location.country = location.country;
        this.location.active = location.active;
        this.location.adCountryCode = location.adCountryCode;
        this.location.adCountryAbrv = location.adCountryAbrv;
        this.displayDialog = true;
    }

    onRowSelect(event) {
    }

    save() {
        this.locationService.saveLocation(this.location)
            .subscribe(
                // The 1st callback handles the data emitted by the observable.
                response => {
                    this.location.locationID != "" ? this.toastrService.success('Data updated Successfully') :
                        this.toastrService.success('Data inserted Successfully');
                    this.loadData();
                },
                // The 2nd callback handles errors.
                (err) => { this.toastrService.warning(err); console.log(err); },
                // The 3rd callback handles the "complete" event.
                () => console.log("observable complete")

            );
        this.displayDialog = false;
    }

    cancel() {
        this.location = new LocationInfo();
        this.displayDialog = false;
    }


    showDialogToDelete(location: Location) {
        this.fullname = location.name + ' ' + location.name;
        this.editLocationId = location.locationID;
        this.displayDeleteDialog = true;
    }

    okDelete(isDeleteConfirm: boolean) {
        if (isDeleteConfirm) {
            this.locationService.deleteLocation(this.editLocationId)
                .subscribe(response => {
                    this.editLocationId = 0;
                    this.loadData();
                });
            this.toastrService.error('Data Deleted Successfully');
        }
        this.displayDeleteDialog = false;
    }
}