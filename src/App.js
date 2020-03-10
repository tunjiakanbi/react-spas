// Import React
import React, { Component } from "react";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";
import Welcome from "./Welcome";
import Home from "./Home";
import Navigation from "./Navigation";
import Login from "./Login";
import Meetings from "./Meetings";
import Register from "./Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      //user: "Tunji"
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBUser => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });

        const meetingsRef = firebase.database().ref('meetings/' + FBUser.uid); 
        meetingsRef.on('value', snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];
          for(let item in meetings) {
            meetingsList.push({
              meetingID : item,
              meetingName: meetings[item].meetingName
            });
          }
          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        })
      } else {
        this.setState({
          user: null
        });
      }
    });

    // const ref = firebase.database().ref('user');
    // ref.on('value', snapshot => {
    //   let FBUser = snapshot.val();
    //   this.setState({user: FBUser});
    // })
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
        navigate("/meetings");
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      displayName: null,
      userID: null,
      user: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeeting = meetingName=> {
    const ref = firebase
    .database()
    .ref(`meetings/${this.state.user.uid}`);
    ref.push({meetingName: meetingName});
  }

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />

        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logOutUser={this.logOutUser}
          />
        )}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings path="/meetings" addMeeting={this.addMeeting} />
          <Register path="/register" registerUser={this.registerUser} />
          {/*
      <Login path="/login" user={this.state.user} />
          <Meetings path="/meetings" user={this.state.user} />
          <Register path="/register" user={this.state.user} />
      */}
        </Router>
      </div>
    );
  }
}

export default App;
