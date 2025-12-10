import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

@pytest.fixture(scope='module')
def driver():
    opts = Options()
    opts.add_argument('--headless=new')  # remove if you need to see the browser
    opts.add_argument('--no-sandbox')
    d = webdriver.Chrome(options=opts)
    yield d
    d.quit()

def test_register_and_login_create_appointment(driver):
    base = 'http://localhost:3000'  # frontend dev server
    driver.get(base)
    time.sleep(1)
    # Click register
    driver.find_element(By.XPATH, "//button[contains(text(),'Registrarse')]").click()
    time.sleep(1)
    # Fill register form
    driver.find_element(By.XPATH, "//input[@placeholder='Nombre']").send_keys('Test User')
    driver.find_element(By.XPATH, "//input[@placeholder='Email']").send_keys('testuser@example.com')
    driver.find_element(By.XPATH, "//input[@placeholder='Password']").send_keys('Password123')
    driver.find_element(By.XPATH, "//button[contains(text(),'Registrarse')]").click()
    time.sleep(2)
    # After register the app auto-login and should show 'Mis citas' or similar
    assert 'Mis citas' in driver.page_source
