import { Component, OnInit } from '@angular/core';
import { Employee } from '../../_models/index';
import { EmployeeService } from '../../_services/index';
import { ToastrService } from 'toastr-ng2';
import { InputTextModule, DataTableModule, ButtonModule, DialogModule, DropdownModule } from 'primeng/primeng';

class EmployeeInfo implements Employee {
    constructor(public code?, public name?, public gender?, public annualSalary?, public dateOfBirth?) { }
}

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {

    private rowData: any[];
    displayDialog: boolean;
    displayDeleteDialog: boolean;
    newEmployee: boolean;
    employee: Employee = new EmployeeInfo();
    employees: Employee[];
    public editEmployeeId: any;
    public fullname: string;

    constructor(private employeeService: EmployeeService, private toastrService: ToastrService) {

    }

    ngOnInit() {
        this.editEmployeeId = 0;
        this.loadData();
    }

    loadData() {
        this.employeeService.getEmployees()
            .subscribe(res => {
                this.rowData = res.result;
            });
    }

    showDialogToAdd() {
        this.newEmployee = true;
        this.editEmployeeId = 0;
        this.employee = new EmployeeInfo();
        this.displayDialog = true;
    }


    showDialogToEdit(employee: Employee) {
        this.newEmployee = false;
        this.employee = new EmployeeInfo();
        this.employee.code = employee.code;
        this.employee.name = employee.name;
        this.employee.gender = employee.gender;
        this.employee.annualSalary = employee.annualSalary;
        this.employee.dateOfBirth = employee.dateOfBirth;
        this.displayDialog = true;
    }

    onRowSelect(event) {
    }

    save() {
        this.employeeService.saveEmployee(this.employee)
            .subscribe(response => {
                this.employee.code > 0 ? this.toastrService.success('Data updated Successfully') :
                    this.toastrService.success('Data inserted Successfully');
                this.loadData();
            });
        this.displayDialog = false;
    }

    cancel() {
        this.employee = new EmployeeInfo();
        this.displayDialog = false;
    }


    showDialogToDelete(employee: Employee) {
        this.fullname = employee.name;
        this.editEmployeeId = employee.code;
        this.displayDeleteDialog = true;
    }

    okDelete(isDeleteConfirm: boolean) {
        if (isDeleteConfirm) {
            this.employeeService.deleteEmployee(this.editEmployeeId)
                .subscribe(response => {
                    this.editEmployeeId = 0;
                    this.toastrService.error('Data Deleted Successfully');
                    this.loadData();
                },
                // The 2nd callback handles errors.
                (err) => { this.toastrService.warning(err); console.log(err); },
                // The 3rd callback handles the "complete" event.
                () => console.log("observable complete")
            );
            
        }
        this.displayDeleteDialog = false;
    }
}