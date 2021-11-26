import { useState } from "react";
import ElevatorButtons from "./ElevatorButtons"; // child component for buttons inside elevator.
import ShowElevatorPreview from "./ShowElevatorPreview"; // child component for showing Preview of the building floors & elevator

/**
 * Interface that indicates the values floor & type of upcomingFloors state based on their types.
 */
export interface FloorState {
  floor: number;
  type: string;
}

function Elevator() {
  const numOfFloors: Array<number> = [0, 1, 2, 3, 4, 5]; // Array of numbers of floor
  // As we need items in decending order for the view the numOfFloors array is sorted and passed to child components
  const sorttedNumOfFloors = numOfFloors.sort(function (a, b) {
    return b - a;
  });
  const [upcomingFloors, setUpcomingFloors] = useState<Array<FloorState>>([]); // state to store mltiple floor values
  const [openElevator, setOpenElevator] = useState<boolean>(false); // state that updates if elevator need to be open/close
  const [currentFloor, setCurrentFloor] = useState<number>(0); // state defines the currrent floor.

  /**
   * 
   * @param a 
   * @param b 
   * @returns sorts floors based on proximity to current floor 
   */
  const compare = (a: FloorState, b: FloorState) => {
    var compareA = Math.abs(a.floor - currentFloor);
    var compareB = Math.abs(b.floor - currentFloor);
    if (compareA < compareB) return -1;
    if (compareA > compareB) return 1;
    return 0;
  };

  /**
   * 
   * @param updatedState 
   * function that handles setState for upcomingFloors
   */
  const handleSelectedFloor = (updatedState: Array<FloorState>) => {
    const temp: Array<FloorState> = [...updatedState];
    temp.sort(compare);
    setUpcomingFloors(temp);
  };

  /**
   * 
   * @param openElevatorBoolValue 
   * function that handles setState for elevator open/close status.
   */
  const handleOpenElevatorStatus = (openElevatorBoolValue: boolean) => {
    setOpenElevator(openElevatorBoolValue);
  };

  /**
   * 
   * @param value 
   * function that handles setState to get current floor.
   */
  const handleCurrentFloor = (value: number) => {
    setCurrentFloor(value);
  };
  return (
    <div className="main">
      <div className="buttonSection">
        <ElevatorButtons
          numOfFloors={sorttedNumOfFloors}
          upcomingFloors={upcomingFloors}
          openElevator={openElevator}
          currentFloor={currentFloor}
          selectedFloor={handleSelectedFloor}
          openElevatorStatus={handleOpenElevatorStatus}
          selectCurrentFloor={handleCurrentFloor}
        />
      </div>
      <div className="preview">
        <ShowElevatorPreview
          numOfFloors={sorttedNumOfFloors}
          upcomingFloors={upcomingFloors}
          openElevator={openElevator}
          currentFloor={currentFloor}
          selectedFloor={handleSelectedFloor}
          openElevatorStatus={handleOpenElevatorStatus}
          selectCurrentFloor={handleCurrentFloor}
        />
      </div>
    </div>
  );
}

export default Elevator;
