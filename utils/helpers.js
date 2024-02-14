/**
 * @file helpers.js 
 * Contains helper functions for the project source files 
 */

module.exports = {
	/**
	 * @function format_date
	 * @param {*} date 
	 * @returns {String} formatted date 
	 * Formats the date parameter to M/D/YYYY
	 */
    format_date(date) {
      	return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
}  