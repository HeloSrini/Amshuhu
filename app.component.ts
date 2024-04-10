import {Component, OnInit} from '@angular/core';
import {DataService} from './data.service';
import {FormBuilder,FormGroup} from '@angular/forms';
import { info, log } from 'console';

@Component
({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Project';
  adding:boolean=false;
  editing:boolean=false;
  data:any;
  item:any;
  info:any;
  editId!:number;
  editData!:any;
  form!:FormGroup;
  active!:FormGroup;
  error: any; 
  newData:any;
  showEdit:boolean = false;
  showForm: boolean = false;
  showdata:boolean = false;
  newItem:any = {};
  edit:any={value:'',id:''};
  id!:number;
  toggle:any = {status:'',id:''};
  constructor(private dataService: DataService, private formBuilder: FormBuilder) {}

  ngOnInit() 
  {
    this.fetchData();
    this.form = this.formBuilder.group
    ({
      
      cmpname: '',
      cmploc: ''
    });

    this.active=this.formBuilder.group
    ({
      cmpname:'',
      cmploc:''
    }); 
  }

  fetchData() 
  {
    this.dataService.getData().subscribe
    ({
      next: (response) => {
        this.data = response;
        this.error = null;
      },
      error: (error) => {
        this.error = error;
        this.data = null;
      }
    });
  }

  MyData(data:any) 
  {
    // if(!data || !data.cmpid || !data.cmpname || !data.cmploc)
    // {
    //   console.error('Invalid data.Please fill in all the Fields!');
    //   return;
    // }
    console.log(data);
    
    this.dataService.InsertData(data).subscribe
    ({
      next: (response) => {
        this.data = response;
        this.error = null;
        // this.fetchData();
      },
      error: (error) => {
        this.error = error;
        this.data = null;
      }
    });
  }

  toggleForm() 
  {
    this.showForm = !this.showForm;
    this.showEdit=false
  }

  // toggleAdd() {
  //   this.adding = !this.adding;
  //   if (this.adding) {
  //     this.editing = false; // Hide the edit section if adding is true
  //   }
  // }

  // toggleUpdate(info:any)
  // {
  //   this.showdata = !this.showdata;
  //   this.edit.id = info.id;
  // }


  // toggleEdit() {
  //   this.editing = !this.editing;
  //   if (this.editing) {
  //     this.adding = false; // Hide the add section if editing is true
  //   }
  // }


  Clickchange() 
  {
    this.editData = this.active.value;
    this.showEdit=!this.showEdit;
    console.log(this.editData);
    
    this.dataService.editData(this.editId,this.editData).subscribe(
      response => {
        console.log('Status updated successfully:', response);
        this.fetchData();
      },
      error => {
        console.error('Error updating status:', error);
      }
    );
  }

  // active(item:any)
  // {
  //   this.showEdit=!this.showEdit;
  //   this.MyId=item.empname;
  //   this.MyId=item.emploc;
  //   console.log(this.MyId);
  // }

  submitform() 
  {
    const formData = this.form.value;
    console.log('Form submitted:', this.newItem);
    console.log(this.form.value);
    this.MyData(formData);
    // this.form.reset();  //Extra
    this.newItem = {};
    this.toggleForm();
    this.fetchData();
  }
  
  Editform()
  {
    const mysol = this.form.value;
    console.log("Form Executed:",this.newItem);
    // console.log(this.form.value);

  }

  Editbutton()
  {
    this.newData = this.active.value;
    console.log(this.newData);
    this.edit.value = this.newData;
  }

  editdata(item:any)
  {
    this.showEdit = !this.showEdit;
    this.showForm=false;
    this.editId = item.cmpid;
    console.log(this.editId);
    const cmpname=item.cmpname;
    const cmploc=item.cmploc;
    const store = { cmpname,cmploc };
    console.log(store);
    this.active.patchValue(store);  
  }
  
  toggleStatus(event:any,item: any) 
  {
    var newStatus = event.target.checked; 
    if(newStatus==true)
    {
      this.toggle.status='Y';
    }
    else
    {
      this.toggle.status='N';
    }
    this.toggle.id = item;
    console.log(this.toggle);
    this.dataService.updateStatus(this.toggle).subscribe({
    next:response => {
      console.log('Status updated successfully:', response);
      this.fetchData();
      // this.showEdit=false;
    },
    error:error => {
      console.error('Error updating status:', error);
    }
    
  });
  this.fetchData();
}
}


