import React, { useEffect, useState } from 'react';
import Data from './Data';

function Form() {
  return (
    <div>
      <div>Form</div>
      <div>
        <table>
         <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Position</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Hire Date</th>
          </tr>
          {Data.map((item) =>(
            <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.position}</td>
            <td>{item.department}</td>
            <td>{item.salary}</td>
            <td>{item.hiredate}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default Form