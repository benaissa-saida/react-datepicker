# mik-datepicker

Datepicker is a simple and reusable date picker component for [React](https://reactjs.org).

![datepicker](https://github.com/benaissa-saida/BenaissaSaida_14_20042023/assets/78473644/05f7fd9a-de1c-4b87-affa-9bc328fa5231)

### main features

- Select days, year, month, d-day
- Localizable into en-US
- using [date-fns](http://date-fns.org) as date library
- Runtime type checking with PropTypes

### installation

`npm install mik-datepicker`

### Usage

```javascript
import React, { useState } from "react";
import { DatePicker } from "mik-datepicker";

function Example() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
}
```
