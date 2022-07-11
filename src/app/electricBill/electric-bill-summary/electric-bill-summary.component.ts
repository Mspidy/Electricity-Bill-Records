import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ElectricBillDetails } from '../models/electricBill';
import { ElectricService } from 'src/app/electric.service';

@Component({
  selector: 'app-electric-bill-summary',
  templateUrl: './electric-bill-summary.component.html',
  styleUrls: ['./electric-bill-summary.component.css']
})
export class ElectricBillSummaryComponent implements OnInit {
  ElectricityBillForm:FormGroup;
  ElectricityBillForming:FormGroup;
  electricBillDetails: ElectricBillDetails[] = [];
  summaryShow: boolean = false;
  index: number;

  constructor(private ElectricService: ElectricService) { }

  ngOnInit(): void {
    this.ElectricityBillForm = new FormGroup({
      'billPeriod': new FormControl(null, [Validators.required]),
      'billingDays': new FormControl(null, [Validators.required]),
      'totalServiceCharges': new FormControl(null, [Validators.required]),
      'otherChargesAndCredit': new FormControl(null, [Validators.required]),
      'previousBalance': new FormControl(null, [Validators.required]),
      'totalCharges': new FormControl(null, [Validators.required]),
      'rewardsAndEventsCharge': new FormControl(null, [Validators.required])
    });

    this.ElectricityBillForming = new FormGroup({
      'billPeriod': new FormControl(null, [Validators.required]),
      'billingDays': new FormControl(null, [Validators.required]),
      'totalServiceCharges': new FormControl(null, [Validators.required]),
      'otherChargesAndCredit': new FormControl(null, [Validators.required]),
      'previousBalance': new FormControl(null, [Validators.required]),
      'totalCharges': new FormControl(null, [Validators.required]),
      'rewardsAndEventsCharge': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(){
    this.electricBillDetails.push(this.ElectricityBillForm.value);
    console.log("value will be",this.ElectricityBillForm.value);
    const postBody = {
      billPeriod: this.ElectricityBillForm.value.billPeriod,
      billingDays: this.ElectricityBillForm.value.billingDays,
      totalServiceCharges: this.ElectricityBillForm.value.totalServiceCharges,
      otherChargesAndCredit: this.ElectricityBillForm.value.otherChargesAndCredit,
      previousBalance: this.ElectricityBillForm.value.previousBalance,
      totalCharges: this.ElectricityBillForm.value.totalCharges,
      rewardsAndEventsCharge: this.ElectricityBillForm.value.rewardsAndEventsCharge
    };
    console.log("This is for post",postBody)
    this.ElectricService.addUser(postBody).subscribe(data =>{
      console.log(data);
    }, (err)=>{
      console.log("Unable to add user" + err)
    })
    this.ElectricityBillForm.reset();
  }

  showSummary(){
    this.summaryShow=true;
  }

  electricBill(){
    this.summaryShow=false;
  }

  removeElectricBill(billPeriod:string){
    for (let i = 0; i < this.electricBillDetails.length; i++) {
      if (this.electricBillDetails[i].billPeriod === billPeriod) {
        this.electricBillDetails.splice(i, 1);
      }
    }
  }

  onUpdate(){
    this.electricBillDetails[this.index] = this.ElectricityBillForming.value;
    
  }

  editElectricBill(periods){
    this.index = this.electricBillDetails.findIndex(x=>x.billPeriod==periods)
    this.ElectricityBillForming.setValue({
      billPeriod:this.electricBillDetails[this.index].billPeriod,
      billingDays:this.electricBillDetails[this.index].billingDays,
      totalServiceCharges:this.electricBillDetails[this.index].totalServiceCharges,
      otherChargesAndCredit:this.electricBillDetails[this.index].otherChargesAndCredit,
      previousBalance:this.electricBillDetails[this.index].previousBalance,
      totalCharges:this.electricBillDetails[this.index].totalCharges,
      rewardsAndEventsCharge:this.electricBillDetails[this.index].rewardsAndEventsCharge
    })
  }

}
