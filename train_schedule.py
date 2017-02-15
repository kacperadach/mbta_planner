import pickle

from IPython.core.debugger import Tracer
from selenium import webdriver

from scrape_constants import QUERY_STRINGS, TRAIN_ABBRS

direction_button_id = '#timetable_direction'
timing_button_id = '#timetable_timing'
redisplay_button_class = '.form_btn'
schedule_table_id = '#schedule_table1'

BASE_URL = 'http://www.mbta.com/schedules_and_maps/rail/lines/?route='

def get_train_schedules():
	for qs in QUERY_STRINGS:
		url = BASE_URL + qs
		driver = get_page_driver(url)
		for direction in ('inbound', 'outbound'):
			for timing in ('weekday', 'saturday', 'sunday'):
				choose_direction(driver, direction)
				choose_timing(driver, timing)
				click_redisplay_time(driver)
				table_data = get_table_data(driver)
				save_table_data_as_pickle('{}-{}-{}.p'.format(TRAIN_ABBRS[qs], direction, timing), table_data)
	print 'Finished Scraping Train Schedules'


def save_table_data_as_pickle(name, table_data):
	pickle.dump(table_data, open('pickles/{}'.format(name), 'wb'))
	print 'Pickle Created: {}'.format(name)


def get_table_data(driver):
	table = driver.find_element_by_css_selector(schedule_table_id)
	table_rows = table.find_elements_by_tag_name('tr')
	all_rows = []
	for r in table_rows:
		new_row = []
		new_row.append(r.text.split('\n')[0])
		tds = r.find_elements_by_tag_name('td')
		for td in tds:
			if td.text != '':
				new_row.append(td.text)
		all_rows.append(new_row)
	return all_rows


def choose_timing(driver, timing):
	timing_button = driver.find_element_by_css_selector(timing_button_id)
	for option in timing_button.find_elements_by_tag_name('option'):
		if option.text.lower() == timing:
			option.click()


def choose_direction(driver, direction):
	direction_button = driver.find_element_by_css_selector(direction_button_id)
	for option in direction_button.find_elements_by_tag_name('option'):
		if option.text.lower() == direction:
			option.click()


def click_redisplay_time(driver):
	driver.find_element_by_css_selector(redisplay_button_class).click()


def get_page_driver(url):
	driver = webdriver.Chrome()
	driver.get(url)
	return driver


if __name__ == '__main__':
	get_train_schedules()