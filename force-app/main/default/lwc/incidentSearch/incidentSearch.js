import { LightningElement, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import STATUS_FIELD from '@salesforce/schema/Incident__c.Status__c';
import APPLIES_FIELD from '@salesforce/schema/Incident__c.Applies_To__c';
import { fireEvent } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class IncidentSearch extends LightningElement {
    incNum = '';
    statusValue = '';
    appliesToValue = '';
    @wire(CurrentPageReference) pageRef;
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: STATUS_FIELD })
    statusValues;
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: APPLIES_FIELD })
    appliesToValues;
    handleIncChange(event){
        this.incNum = event.target.value;
    }

    handlePickListChange(event){
        if(event.target.name === 'status'){
            this.statusValue = event.target.value;
        }
        else if(event.target.name === 'appliesTo'){
            this.appliesToValue = event.target.value;
        }
    }

    handleSearch(){

        let JSONPayload = {'incNum' : this.incNum,
                           'statusValue' : this.statusValue,
                           'appliesToValue' : this.appliesToValue};
        
        fireEvent(this.pageRef,'searchkey',JSONPayload);

    }



}