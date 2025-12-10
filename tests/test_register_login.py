import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

BASE = 'http://localhost:3000'

@pytest.fixture(scope='module')
def driver():
    opts = Options()
    opts.add_argument('--headless=new')
    d = webdriver.Chrome(options=opts)
    yield d
    d.quit()

def test_register_and_login(driver):
    driver.get(BASE)
    time.sleep(1)
    driver.find_element(By.XPATH, "//button[contains(text(),'Registrarse')]").click()
    time.sleep(1)
    driver.find_element(By.XPATH, "//input[@placeholder='Nombre']").send_keys('AutoTest User')
    driver.find_element(By.XPATH, "//input[@placeholder='Email']").send_keys('autotest@example.com')
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys('Password123!')
    driver.find_element(By.XPATH, "//button[contains(text(),'Registrarse')]").click()
    time.sleep(2)
    assert 'Mis citas' in driver.page_source
