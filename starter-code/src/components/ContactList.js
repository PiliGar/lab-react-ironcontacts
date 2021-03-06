import React, { useState } from "react";
import styled from "styled-components";
import Contact from "./ListItem";
import Header from "./ListItem";
import contacts from "../../src/contacts.json";

const ContactTable = styled.table`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: color-interpolation-filters;
  margin-top: 30px;
`;

const Btn = styled.a`
  display: inline-block;
  color: #000000;
  background: #61dafb;
  border-radius: 5px;
  padding: 15px;
  font-size: 16px;
  outline: none;
  border: 0px;
  margin-right: 15px;
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    color: #61dafb;
    background: #282c34;
  }
`;

export const List = () => {
  const [list, setList] = useState(contacts.slice(0, 5));

  //   const [sorted, setSorted] = useState({ sorted: "ascendet" });

  //   const showSpinner = () => {
  //     const body = document.getElementsByTagName("body"),
  //     const spinner = document.getElementById("spinner"),
  //       show = function() {
  //         spinner.style.display = "block";
  //         body.style.overflow = "hidden";
  //         setTimeout(hide, 400);
  //       },
  //       hide = function() {
  //         spinner.style.display = "none";
  //         body.style.overflow = "visible";
  //       };
  //     show();
  //   };

  const showSpinner = msg => {
    const body = document.getElementsByTagName("BODY")[0];
    const spinner = document.getElementById("spinner");
    const text = document.getElementById("spinner-message");
    console.log(msg);
    console.log(text);
    spinner.style.display = "block";
    text.innerHTML = msg;
    body.style.overflow = "hidden";
    setTimeout(hideSpinner, 1000);
  };

  const hideSpinner = () => {
    const body = document.getElementsByTagName("BODY")[0];
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
    body.style.overflow = "visible";
  };

  const addRamdomContact = e => {
    e.preventDefault();
    const newContact = contacts[Math.floor(Math.random() * contacts.length)];
    list.includes(newContact)
      ? addRamdomContact()
      : setList([...list, newContact]);
    const message = `Adding contact: ${newContact.name}`;
    showSpinner(message);
  };

  const sortByName = e => {
    e.preventDefault();
    const sortedList = [...list].sort((a, b) => a.name.localeCompare(b.name));
    setList(sortedList);
    showSpinner();
    const message = `Sorting Alphabetically`;
    showSpinner(message);
  };

  const sortByPopularityAsc = e => {
    e.preventDefault();
    const sortedList = [...list].sort((a, b) => a.popularity - b.popularity);
    setList(sortedList);
    const message = `Sorting by: less popular`;
    showSpinner(message);
  };

  const sortByPopularityDes = e => {
    e.preventDefault();
    const sortedList = [...list].sort((a, b) => b.popularity - a.popularity);
    setList(sortedList);
    const message = `Sorting by: most popular`;
    showSpinner(message);
  };

  //   const sortByPopularity = () => {
  //     const currentSortOrder = [...sorted];
  //     if (sorted === { sorted: "ascendet" }) {
  //       sortByPopularityAsc();
  //       currentSortOrder = { sorted: "ascendet" };
  //       setSort(currentSortOrder);
  //     } else {
  //       currentSortOrder = { sorted: "descendent" };
  //       sortByPopularityDes();
  //       setSort(currentSortOrder);
  //     }
  //   };

  const removeContact = (contact, i) => {
    const confirmation = confirm(
      `You are going to remove this contact: ${contact.name}`
    );
    if (confirmation == true) {
      const upDatedList = [...list].filter(c => c !== contact);
      setList(upDatedList);
    } else {
      return;
    }
  };

  return (
    <div className="App-wrapper">
      <h1>Iron contacts</h1>
      <Btn onClick={addRamdomContact}>Add Random Contact</Btn>
      <Btn onClick={sortByName}>Sort By Name</Btn>
      {/* <Btn onClick={sortByPopularity}>Sort By Popularity</Btn> */}
      <Btn onClick={sortByPopularityAsc}>Sort By Popularity ▲</Btn>
      <Btn onClick={sortByPopularityDes}>Sort By Popularity ▼</Btn>
      <ContactTable>
        <thead>
          <Header>
            <td>
              <h2>Picture</h2>
            </td>
            <td>
              <h2>Name</h2>
            </td>
            <td>
              <h2>Popularity</h2>
            </td>
            <td></td>
          </Header>
        </thead>
        <tbody>
          {list.map((contact, i) => (
            <Contact key={i}>
              <td>
                <img src={contact.pictureUrl} alt={contact.name}></img>
              </td>
              <td>{contact.name}</td>
              <td>⭐ {contact.popularity.toFixed(2)}</td>
              <td>
                <Btn onClick={() => removeContact(contact, i)}>Remove</Btn>
              </td>
            </Contact>
          ))}
        </tbody>
      </ContactTable>
    </div>
  );
};
