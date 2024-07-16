export default function createIteratorObject(report) {
  const employees = [];
  for (const dept in report.allEmployees) {
    if (dept) {
      employees.push(...report.allEmployees[dept]);
    }
  }
  return employees;
}
