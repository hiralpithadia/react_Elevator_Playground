import { MouseEvent } from 'react';
import { FloorState } from './Elevator' // import interface that includes upcomingFloors state values of floor & types.

/**
 * handles props values
 */
type ElevatorProps = {
  numOfFloors: Array<number>,
  upcomingFloors: Array<FloorState>,
  openElevator: boolean,
  currentFloor: number,
  selectedFloor: Function,
  openElevatorStatus: Function,
  selectCurrentFloor:Function
}

/**
 * 
 * @param props 
 * @returns buttons present inside elevator.
 */
function ElevatorButtons(props:ElevatorProps) {

  /**
   * 
   * @param floor 
   * @returns boolean value that will help to add class to elevator buttons.
   */
  const checkFloorExists = (floor:number) => {
    const filterFloors = props.upcomingFloors.filter(
      (el) => el.floor === floor && el.type === "elev_button"
    );
    return filterFloors.length === 0 ? false : true;
  };

  /**
   * 
   * @param event 
   * onClick function for elevator buttons
   */
  const handlePressButton = (event: MouseEvent<HTMLButtonElement>) => {
    if (props.currentFloor !== parseInt(event.currentTarget.innerText)) {
      // event.preventDefault();
      props.upcomingFloors.push({
        floor: parseInt(event.currentTarget.innerText),
        type: "elev_button",
      });
      props.selectedFloor(props.upcomingFloors);
    }
  };

  return (
    <div className="floorButtons">
      {props.numOfFloors.map((floor) => (
        <div key={floor}>
          <button
            type="button"
            aria-label="fifth"
            className={`floorBtn ${
              checkFloorExists(floor) ? "btnHighlight" : "btnNormal"
            }`}
            onClick={handlePressButton}
          >
            {floor}
          </button>
        </div>
      ))}
    </div>
  );
}
export default ElevatorButtons;
