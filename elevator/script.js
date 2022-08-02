const mainWrapper = document.querySelector(".building");

const elevator1 = document.querySelector(".elevator1");
const elevator2 = document.querySelector(".elevator2");
const elevator3 = document.querySelector(".elevator3");

const person1 = document.querySelector(".person1");
const person2 = document.querySelector(".person2");

let numberOfFloors = prompt("enter number of floors");

const elevatorArr = [elevator1, elevator2, elevator3];

const floorHeight = 150;

// ---------------------------------------------------------
const randomFloor = (max) => {
  return Math.floor(Math.random() * max) * floorHeight + 3;
};

elevator1.style.bottom = `${randomFloor(numberOfFloors)}px`;
elevator2.style.bottom = `${randomFloor(numberOfFloors)}px`;
elevator3.style.bottom = `${randomFloor(numberOfFloors)}px`;

person1.style.bottom = `${randomFloor(numberOfFloors)}px`;
person2.style.bottom = `${randomFloor(numberOfFloors)}px`;
// ----------------------------------------------------------------
const minDistancePerson1 = [
  parseInt(elevator1.style.bottom) - parseInt(person1.style.bottom),
  parseInt(elevator2.style.bottom) - parseInt(person1.style.bottom),
  parseInt(elevator3.style.bottom) - parseInt(person1.style.bottom),
].map((item, index) => Math.abs(item));

const minDistancePerson2 = [
  parseInt(elevator1.style.bottom) - parseInt(person2.style.bottom),
  parseInt(elevator2.style.bottom) - parseInt(person2.style.bottom),
  parseInt(elevator3.style.bottom) - parseInt(person2.style.bottom),
].map((item, index) => Math.abs(item));
// ---------------------------------------------------------------------
const elevatorRunner = (floor) => {
  let minDistIndex1 = minDistancePerson1.indexOf(
    Math.min(...minDistancePerson1)
  );
  let minDistIndex2 = minDistancePerson2.indexOf(
    Math.min(...minDistancePerson2)
  );

  if (person1.style.bottom === `${floorHeight * (floor - 1) + 3}px`) {
    elevatorArr[minDistIndex1].style.bottom = `${floorHeight * (floor - 1) + 3}px`;
    elevatorArr[minDistIndex1].style.border = "3px solid red";
    elevatorArr.splice(minDistIndex1, 1);
    minDistancePerson2.splice(minDistIndex1, 1);
  } else if (person2.style.bottom === `${floorHeight * (floor - 1) + 3}px`) {
    elevatorArr[minDistIndex2].style.bottom = `${floorHeight * (floor - 1) + 3}px`;
    elevatorArr[minDistIndex2].style.border = "3px solid red";
    minDistancePerson1.splice(minDistIndex2, 1);
    elevatorArr.splice(minDistIndex2, 1);
  }
};
// ----------------------------------------------------------------
const floorCreator = (floorCount) => {
  const floor = document.createElement("div");
  const button = document.createElement("button");
  const buttonNumberNode = document.createTextNode(`${floorCount}`);

  floor.classList.add("floor");

  button.classList.add("button", `button${floorCount}`);
  button.appendChild(buttonNumberNode);
  button.addEventListener("click", () => {
    elevatorRunner(floorCount);
    button.disabled = true;
  });
  floor.appendChild(button);
  mainWrapper.appendChild(floor);
};

for (let i = 0; i < numberOfFloors; i++) {
  floorCreator(numberOfFloors - i);
}
// ----------------------------------------------------------------
