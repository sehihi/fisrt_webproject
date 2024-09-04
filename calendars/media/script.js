document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    dateClick: function (info) {
      const schedule = prompt("Enter your schedule for " + info.dateStr);
      if (schedule) {
        calendar.addEvent({
          title: schedule,
          start: info.dateStr,
        });
        vscode.postMessage({ command: "addSchedule", text: schedule });
      }
    },
  });

  calendar.render();
});
