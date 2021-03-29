var todaysDate = moment().format("dddd, MMMM Do YYYY");
var hour = moment().hour();
var currentHour = parseInt(moment().format("H"));

// Display todays date in header

$("#currentDay").append(todaysDate);

//Create schedule time slots for a work day standard business hours (9am-5pm)

for (var i = 9; i < 18; i++) {
  var rec = localStorage.getItem("scheduledEvent" + i);
  var localRec;
  var readRecord = {
    recordTime: "",
    recordDescription: "",
  };

  if (rec != null) {
    localRec = JSON.parse(rec);
    // console.log(localRec.recordTime);
    // console.log(localRec.recordDescription);
    readRecord.recordTime = localRec.recordTime;
    readRecord.recordDescription = localRec.recordDescription;
  }

  var scheduleElement = $("<div>").addClass("row time-block");
  var scheduleTimeObject = moment().hour(i);
  var hourTextDisplay = moment(scheduleTimeObject).format("hA");

  //Create "Hour' for schedule grid template
  if (i <= 17) {
    // $("<div />", { class: "wrapper", id: "product" + i });
    var hourTimeSlotElement = $("<div>", { id: "timeSlot" + i })
      .addClass("col-2 col-sm-1 hour")
      .text(hourTextDisplay);
  }

  //Create "Event" for schedule grid template
  var descriptionColumn = $("<textarea>", { id: "scheduleDesc" + i })
    .addClass("col-8 col-sm-10 description")
    .text(readRecord.recordDescription);

  // Create the save button
  var saveBtnElement = $("<div>", { id: "saveButton" + i })
    .addClass("col-2 col-sm-1 saveBtn p-4")
    .html('<i class="far fa-save"></i>');

  //Structure template
  scheduleElement.append(
    hourTimeSlotElement,
    descriptionColumn,
    saveBtnElement
  );

  // Append template to the container element
  $(".container").append(scheduleElement);

  // Timeslot color coding used to identify past, present and future hours

  if (i < currentHour) {
    descriptionColumn.addClass("past");
  } else if (i === currentHour) {
    descriptionColumn.addClass("present");
  } else descriptionColumn.addClass("future");

  //Create save event object

  var time = hourTextDisplay;
  var description = $(".description").val().trim();

  var saveRecord = {
    recordTime: "00am",
    recordDescription: "description",
  };

  //Save events to local storage
  $("#saveButton" + i).click(function () {
    //  str1 = "test123.00".replace ( /[^\d.]/g, '' );
    var saveButtonId = this.id;
    var saveButtonStr = saveButtonId.replace(/[^\d.]/g, "");
    // var saveButtonNumber = parseInt(saveButtonStr);
    saveRecord.recordTime = $("#timeSlot" + saveButtonStr).text();
    saveRecord.recordDescription = $("#scheduleDesc" + saveButtonStr)
      .val()
      .trim();

    localStorage.setItem(
      "scheduledEvent" + saveButtonStr,
      JSON.stringify(saveRecord)
    );
  });
}
