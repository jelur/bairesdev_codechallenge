// JavaScript code for Popup Challenge

function renderElement(sType,sClass,sText,oChild = null) {
  var oNode = document.createElement(sType);
  oNode.className = sClass;
  oNode.innerText = sText;

  if (oChild!==null) {
    oNode.appendChild(oChild);
  }
  return oNode;
}

var STEPPER = {
  data: [
    { 
      "id": "1",
      "title": "Draft",
      "note": "Created on",
      "date": "01/31/2020",
      "done": "true"
    },
    {
      "id": "2",
      "title": "Pending Approval",
      "note": "Approval sent",
      "date": "01/31/2020",
      "done": "true"
    },
    {
      "id": "3",
      "title": "Approved",
      "note": "Abandoned on",
      "date": "02/20/2020",
      "done": "false"
    },
    {
      "id": "4",
      "title": "Execute",
      "note": "Created on",
      "date": "01/31/2020",
      "done": "false"
    },
    {
      "id": "5",
      "title": "Concluded",
      "done": "false"
    },
    {
      "id": "6",
      "title": "Closed",
      "done": "false"
    }
  ],

  render: function(sParentID) {
    var oParent = document.getElementById(sParentID);

    if (oParent) {
      STEPPER.data.forEach((step) => {
        var oStepNode = document.createElement('div');
        oStepNode.className = "step--item";
        if (step.done != undefined && step.done == 'true')
          oStepNode.classList.add("process-done");

        oStepNode.appendChild(renderElement('div','step--icon',step.id));
        oStepNode.appendChild(renderElement('div','step--title',step.title));
        if (step.note!=undefined) {
          oStepNode.appendChild(renderElement('div','step--note',step.note,renderElement('span','step--date',step.date)));
        }

        oParent.appendChild(oStepNode);
      })
    }
  }
}

function showPopup() {
  if (this.getAttribute('data-popupid')) {
    var oPopup = document.getElementById(this.getAttribute('data-popupid'));
    if (oPopup)
      oPopup.classList.add("active");
  }
}
function dismissPopup() {
  if (this.getAttribute('data-popupid')) {
    var oPopup = document.getElementById(this.getAttribute('data-popupid'));
    if (oPopup)
      oPopup.classList.remove("active");
  }
}

document.addEventListener("DOMContentLoaded", function() {
  // Attacing actions to buttons
  var oActionButton = document.getElementsByClassName('action-show-popup')[0];
  oActionButton.addEventListener('click', showPopup);

  oActionButton = document.getElementsByClassName('action-hide-popup');
  Array.prototype.forEach.call(oActionButton, function(oButton) {
      oButton.addEventListener('click', dismissPopup)
  });

  // Rendering ppopup
  STEPPER.render('stepperComponent');

  // Close all Active popups pressing Escape key
  document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc")
    } else {
        isEscape = (evt.keyCode === 27)
    }
    if (isEscape) {
      var oPopupList = document.getElementsByClassName('popup--wrapper');

      Array.prototype.forEach.call(oPopupList, function(oPopup) {
        oPopup.classList.remove("active")
      });
    }
  }
});



