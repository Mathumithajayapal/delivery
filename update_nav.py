import os
import re

dir_path = r"c:\Users\MADHUMITHA\Desktop\projects\Aug(1)Hardware"
files = ["about.html", "booking.html", "contact.html", "delivery.html", "home2.html", "maintenance.html", "service.html"]

for file in files:
    filepath = os.path.join(dir_path, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. replace Consultation
    content = content.replace('Consultation</a>', 'Book Now</a>')
    
    # 2. Add desktop cart
    desktop_cart = r'''<a href="#" class="w-9 h-9 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary-500 transition-colors relative" title="View Cart">
          <i class="fa-solid fa-cart-shopping"></i>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </a>
        <button id="darkToggleBtn"'''
    
    content = re.sub(r'<button id="darkToggleBtn"', desktop_cart, content, count=1)
    
    # 3. Add mobile cart
    mobile_cart = r'''<div class="flex gap-4">
          <a href="#" class="flex items-center justify-center w-12 rounded-full border-[1.5px] border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-primary-500 hover:border-primary-500 transition-colors relative">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
          </a>
          <a href="login.html"'''
    
    content = re.sub(r'<div class="flex gap-4">\s*<a href="login.html"', mobile_cart, content, count=1)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated all HTML files successfully.")
