# UniFound

A well-built web application for the students of a University that acts as a LOST & FOUND APP.

- Users can upload item images and files in a lost report.
- Users can search if someone found their lost item anywhere on the campus
- Users can claim such an item.

## API reference

| Endpoint          | Method | Description                                             |
| ----------------- | ------ | ------------------------------------------------------- |
| /                 | any    | check if server is working                              |
| /items/?category= | GET    | Get all items having that exact category                |
| /items/:id        | GET    | Get info of specific item                               |
| /items/add        | POST   | Add new item                                            |
| /items/:id        | DELETE | To remove an item                                       |
| /files            | GET    | To get list of all files stored                         |
| /delete/:id       | DELETE | Delete file of name :id, Requires ADMIN_TOKEN in header |
