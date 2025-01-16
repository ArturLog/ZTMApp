from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-gpu")
options.add_argument("--remote-debugging-port=9222")

driver = webdriver.Chrome(options=options)

try:
    # Open the application
    driver.get("http://localhost:3000")
    time.sleep(1)  # Wait for 1 second

    # Wait for the login button to appear
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Login')]"))
    )
    time.sleep(1)

    # Log in process
    login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Login')]")
    login_button.click()
    time.sleep(1)

    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Login')]"))
    )
    time.sleep(1)

    email_input = driver.find_element(By.ID, "email")
    email_input.send_keys("asd@asd.asd")
    time.sleep(1)

    password_input = driver.find_element(By.ID, "password")
    password_input.send_keys("Asdasd123")
    time.sleep(1)

    submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
    submit_button.click()
    time.sleep(1)

    # Wait for "My Stops" button
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'My Stops')]"))
    )
    time.sleep(1)
    print("Login successful!")

    # Navigate to Profile
    profile_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Profile')]")
    profile_button.click()
    time.sleep(1)

    print("Navigated to Profile page.")
    time.sleep(1)

    # Navigate to My Stops
    my_stops_button = driver.find_element(By.XPATH, "//button[contains(text(), 'My Stops')]")
    my_stops_button.click()
    time.sleep(1)

    print("Navigated to My Stops page.")
    time.sleep(1)

    # Add the first stop from the list
    add_stop_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Stop')]")
    add_stop_button.click()
    print("Click add stop")
    time.sleep(1)



    # Force-click the "Add" button using JavaScript
    driver.execute_script("""
        Array.from(document.querySelectorAll('button'))
            .find(button => button.textContent.trim() === 'Add')
            .click();
    """)
    print("First stop added successfully.")


    # Remove the first stop from the list
    remove_stop_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Remove Stop')]")
    remove_stop_button.click()
    print("Click remove stop")
    time.sleep(1)


    driver.execute_script("""
        Array.from(document.querySelectorAll('button'))
            .find(button => button.textContent.trim() === 'Remove')
            .click();
    """)
    print("First stop removed successfully.")
    time.sleep(1)

    # Logout
    logout_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Logout')]")
    logout_button.click()
    time.sleep(1)
    print("Logout successful!")

finally:
    driver.quit()
