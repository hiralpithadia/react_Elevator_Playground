import { useRef, useEffect } from "react";
import { FloorState } from './Elevator' // import interface that includes upcomingFloors state values of floor & types.

/**
 * handles props values
 */
type ElevatorProps = {
  numOfFloors: Array<number>;
  upcomingFloors: Array<FloorState>;
  openElevator: boolean;
  currentFloor: number;
  selectedFloor: Function;
  openElevatorStatus: Function;
  selectCurrentFloor: Function;
};

/**
 * 
 * @param props 
 * @returns Preview of building floors & moving/standing elevator 
 */
function ShowElevatorPreview(props: ElevatorProps) {
  const elevatorRef = useRef<HTMLDivElement | null>(null); // Ref of elevator
  const elevatorHeight: number = 82; // Height of elevator

  useEffect(() => {
    handleElevatorMovement();
  });

  /**
   * 
   * @returns handles the movement of elevator when floor state changes on selecting the buttons.
   */
  const handleElevatorMovement = async () => {
    if (props.upcomingFloors.length === 0) {
      return;
    }
    let floorToMove = props.upcomingFloors[0].floor;

    if (props.currentFloor !== floorToMove) {
      props.openElevatorStatus(false);
      if (props.currentFloor < floorToMove) {
        await moveElevator(props.currentFloor + 1, 3000);
        props.selectCurrentFloor(props.currentFloor + 1);
      } else {
        await moveElevator(props.currentFloor - 1, 3000);
        props.selectCurrentFloor(props.currentFloor - 1);
      }
    }
    if (props.currentFloor === floorToMove && !props.openElevator) {
      props.openElevatorStatus(true);
      await sleep(4000);
      props.upcomingFloors.shift();
      props.selectedFloor(props.upcomingFloors);
      props.openElevatorStatus(false);
    }
  };

  /**
   * 
   * @param i : floor
   * @param ms : milliseconds
   * function that moves the elevator using bottom CSS & use sleep function to show delay.
   */
  const moveElevator = async (i: number, ms: number) => {
    await sleep(ms);
    if (elevatorRef.current) {
      elevatorRef.current.style.bottom = i * elevatorHeight + "px";
    }
  };

  /**
   * 
   * @param ms : milliseconds
   * @returns promise to handle delay 
   */
  const sleep = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  /**
   * 
   * @param floor 
   * @param direction 
   * function called on click of Arrow Navigate buttons
   */
  const handleCallElevator = (floor: number, direction: string) => {
    props.upcomingFloors.push({
      floor: floor,
      type: `arrow_button_${direction}`,
    });
    props.selectedFloor(props.upcomingFloors);
  };

  /**
   * 
   * @param floor 
   * @param direction 
   * @returns boolean value that will help to add class to Arrow Navigate buttons.
   */
  const checkForHighlight = (floor: number, direction: string) => {
    const filterFloors = props.upcomingFloors.filter(
      (el) => el.floor === floor && el.type === `arrow_button_${direction}`
    );
    return filterFloors.length === 0 ? false : true;
  };
  return (
    <div className="previewMain">
      <div>
        {props.numOfFloors.map((floor, index) => (
          <div key={`${floor}_${index}`} className="building">
            <div className="navigateBtnsSection">
              {floor !== props.numOfFloors.length - 1 && (
                <button
                  type="button"
                  className={`btn btnUp ${
                    checkForHighlight(floor, "up") && "highlightArrowBtn"
                  }`}
                  onClick={(e) => handleCallElevator(floor, "up")}
                >
                  <i className="arrow up"></i>
                </button>
              )}
              {floor !== 0 && (
                <button
                  type="button"
                  className={`btn ${
                    checkForHighlight(floor, "down") && "highlightArrowBtn"
                  }`}
                  onClick={(e) => handleCallElevator(floor, "down")}
                >
                  <i className="arrow down"></i>
                </button>
              )}
            </div>
            <div id={`floor_${floor}`} className="buildingFloor">
              <h3>{floor} floor</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="elevatorSpot">
        <div
          className={`elevator ${
            props.openElevator ? "openElevator" : "closeElevator"
          }`}
          ref={(el: HTMLDivElement) => (elevatorRef.current = el)}
        >
          <h5>
            {props.openElevator ? "Welcome!" : "Closed!"}
          </h5>
        </div>
      </div>
    </div>
  );
}
export default ShowElevatorPreview;
