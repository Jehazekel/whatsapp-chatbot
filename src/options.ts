
export const options = [
  {
    "type": "list",
    "header": {
      "type": "text",
      "text": "Header"
    },
    "body": {
      "text": "Body"
    },
    "footer": {
      "text": "Footer"
    },
    "action": {
      "button": "Button",
      "sections":[
        {
          "title":"Section 1",
          "rows":[
            {
              "id":"unique-row-identifier-1",
              "title": "Row 1",
              "description": "Row 1 description"
            }
          ]
        }
      ]
    }
  },
  {
    "type": "reply",
    "body": {
      "text": "Body"
    },
    "action": {
      "buttons":[
        {
          "type": "reply",
          "reply": {
            "id": "unique-button-identifier-1",
            "title": "Button 1"
          }
        }
      ]
    }
  }
];
