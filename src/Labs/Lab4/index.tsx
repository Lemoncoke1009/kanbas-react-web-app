import ClickEvent from "./ClickEvent"
import PassingDataOnEvent from "./PassingDataOnEvent"
import PassingFunctions from "./PassingFunctions"
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";

export default function Lab3() {
  function sayHello() {
    alert("Hello");
  }

    return (
      
      <div id="wd-passing-functions">
        <h3>Lab 4</h3>
        <ClickEvent />
<PassingDataOnEvent />
<PassingFunctions theFunction={sayHello} />
      <EventObject />
<Counter />
<BooleanStateVariables />
<StringStateVariables />
<DateStateVariable />
<ObjectStateVariable />
<ArrayStateVariable />
        </div>
    )
}