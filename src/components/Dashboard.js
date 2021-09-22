//Dashboard Component
import React, { Component } from 'react';
import '../App.css';

export default class Dashboard extends Component {
//State for holding component's dynamic data
    state = {
        tasks: [
            {
                id: 'cla',
                name:"Client 1",
                deal: "Deal 1",
                amount: "Deal Amount 1",
                category:"newLead",
                bgcolor: "#9bc6e0"},

            {
                id: 'clb',
                name:"Client 2",
                deal: "Deal 2",
                amount: "Deal Amount 2",
                category:"newLead",
                bgcolor: "#9bc6e0"
            },

            {
                id: 'clc',
                name:"Client 3",
                deal: "Deal 3",
                amount: "Deal Amount 3",
                category:"newLead",
                bgcolor: "#9bc6e0"
            },

            {
                id: 'cld',
                name:"Client 4",
                deal: "Deal 4",
                amount: "Deal Amount 4",
                category:"newLead",
                bgcolor: "#9bc6e0"
            },
          ]
    }
//onDragOver class method which will take the event, ev as a parameter.
    onDragOver = (ev) => {
        ev.preventDefault();
    }

//onDrop method
    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name === id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

//DragStart method
    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    render() {
//For containing objects we need to setup empty arrays.
        const tasks = {
            newLead: [],
            ongoingLead: [],
            proposedLead: [],
            finishedLead: []
        }

        

//Here we will implement events to drag and drop.
//First we need to setup one card and after that it will change according to events.
    this.state.tasks.forEach ((t) => {
        tasks[t.category].push(
            <div key={t.name} 
                onDragStart = {(e) => this.onDragStart(e, t.name, t.deal)}
                draggable
                className="card p-5 ms-3 mb-2 draggable"
                style = {{backgroundColor: t.bgcolor}}
                >
                <h5 className="card-title">{t.name}</h5>
               <h6 className="card-subtitle">{t.deal}</h6>
             <p className="card-text">{t.amount}</p> 
            </div>
        );
    });
//After setting up a lead you can move your lead one section to another through events.
        return (
            <div className="container-fluid container-drag">
                <div className="row">
                    <div className="col-sm-3 newLead p-0"
                        onDragOver={(e)=>this.onDragOver(e)}
                        onDrop={(e)=>{this.onDrop(e, "newLead")}}>         
                   <button type="button" className="btn btn-lg new-lead">New Leads<span className="btn fs-4 m-0 p-0" data-bs-toggle="modal" data-bs-target="#exampleModal">+</span> </button>
                        <h5 className="card-title">{tasks.newLead}</h5>
                    </div>

                    <div className="col-sm-3 droppable p-0"
                        onDrop={(e)=>this.onDrop(e, "ongoingLead")}
                        onDragOver={(ev)=>this.onDragOver(ev)}>
                    <button type="button" className="btn btn-lg ongoing-lead">Ongoing Leads <span className="fs-4">+</span> </button>
                        {tasks.ongoingLead} 
                    </div>

                    <div className="col-sm-3 droppable p-0"
                        onDrop={(e)=>this.onDrop(e, "proposedLead")}
                        onDragOver={(ev)=>this.onDragOver(ev)}>
                    <button type="button" className="btn btn-lg proposed-lead">Proposed Leads <span className="fs-4">+</span> </button>
                        {tasks.proposedLead}
                    
                    </div>

                    <div className="col-sm-3 droppable  p-0"
                        onDrop={(e)=>this.onDrop(e, "finishedLead")}
                        onDragOver={(ev)=>this.onDragOver(ev)}>
                    <button type="button" className="btn btn-lg finished-lead">Finished Leads <span className="fs-4">+</span> </button>
                        {tasks.finishedLead}      
                    </div>

                </div>
            </div>
        );
    }
}