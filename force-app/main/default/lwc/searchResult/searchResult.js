import { LightningElement, track , wire } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import {CurrentPageReference} from 'lightning/navigation';
import findIncidents from '@salesforce/apex/incidentmanagement.findIncidents';

const columnNames = [
    {label: 'Incident #', fieldName: 'incidentURL', type: 'url', 
    typeAttributes: {label: { fieldName: 'incidentId' }, target: '_blank'}},
    { label: 'Applies To', fieldName: 'appliesTo', type: 'string' },
    { label: 'Status', fieldName: 'status', type: 'string' },
    { label: 'Summary', fieldName: 'summary', type: 'string' },
];

export default class SearchResult extends LightningElement {
    @track incidents;
    @track columns = columnNames;
    incNum;
    statusValue;
    appliesTo;
    //@wire(CurrentPageReference) pageRef;
    @wire(CurrentPageReference) pageRef;
    @wire(findIncidents,{incNum : '$incNum', statusValue : '$statusValue', appliesToValue : '$appliesTo'})
    incidents;
    connectedCallback(){
        registerListener('searchkey',this.handleSearchkey,this);
    }

    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    handleSearchkey(searchKeyData){
        this.incNum = searchKeyData.incNum;
        this.statusValue = searchKeyData.statusValue;
        this.appliesTo =  searchKeyData.appliesToValue;
    }

}