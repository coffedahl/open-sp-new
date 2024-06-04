# Open-SP new
`This project is dead`

Kjell has published its own tools for all the usecases and this tool is now dead

---

This project was intended as a tool for the employees in Kjell & Co stores, the project is a bunch of smaller tools integrated in an simple web frontend to make daily repetitive task much easier for the employees. The tool also feature a login system to prevent access for unauthorized because the tool uses webscraping for data and i do **not** want to mess up the analytics

## Tools
### Delimiter tool for price
This tool can shorten and keep track of price strings that gets dropped every moring. The software for checking prices has a max length of the string and this tools splits a long release into multiple smaller string and adds simple checkboxes to keep track of progress.

### Sign creator
This tool creates the price signs for the store with automaticly fetched data from the website. 

***This tool uses a `webscraper` on [kjells website](https://www.kjell.com) be careful not to overuse or analytics may be messed up***

## Develop on the project
**Requirements:**
- `nodejs`

If you want to develop on the project download the sourcecode from github and install dependencies with 
```bash
npm install
```
you can then start the development server with 
```bash
npm run dev
```