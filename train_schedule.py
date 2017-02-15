import pickle
from datetime import date, timedelta
import math

from bs4 import BeautifulSoup as BS
from IPython.core.debugger import Tracer

from selenium import webdriver
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException

from query_strings import QUERY_STRINGS


BASE_URL = 'www.mbta.com/schedules_and_maps/rail/lines/?route='

def get_train_schedules():
	for qs in QUERY_STRINGS:
		url = BASE_URL + qs
		driver = get_page_driver(url)

def get_page_driver(url):
	driver = webdriver.Chrome()
	driver.get(url)
	return driver

if __name__ == '__main__':
	get_train_schedules()