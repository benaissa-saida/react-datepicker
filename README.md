# mik-datepicker

### installation

`npm install mik-datepicker`

### Usage

```javascript
import { useState } from "react";
import DatePicker from "mik-datepicker/dist/datePicker";

function Example() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        name="startdate"
      />
    </div>
  );
}
```
