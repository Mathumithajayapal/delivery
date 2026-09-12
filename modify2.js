const fs = require('fs');
const path = require('path');

const dirPath = 'c:\\Users\\MADHUMITHA\\Desktop\\projects\\Aug(1)Hardware';
const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // 1. Revert Book Now in desktop nav
    const desktopBookNowRegex = /<li>\s*<a href="booking\.html"\s*class="px-5 py-2 bg-primary-500 text-white rounded-full text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm">Book Now<\/a>\s*<\/li>/;
    const desktopBookNowReplacement = `<li><a href="booking.html"
            class="text-gray-900 dark:text-white hover:text-primary-500 font-medium py-2 transition-colors">Book Now</a>
        </li>`;
    content = content.replace(desktopBookNowRegex, desktopBookNowReplacement);

    // 2. Add Brand CTA to desktop nav (at the end of the ul)
    // We can look for the closing </ul> before the <div class="hidden xl:flex items-center gap-3">
    const desktopUlEndRegex = /<\/ul>\s*<div class="hidden xl:flex items-center gap-3">/;
    const desktopUlEndReplacement = `  <li><a href="#" class="px-5 py-1.5 bg-primary-500 text-white rounded-full text-sm font-semibold hover:bg-primary-600 transition-colors shadow-sm">Brand</a></li>\n      </ul>\n      <div class="hidden xl:flex items-center gap-3">`;
    content = content.replace(desktopUlEndRegex, desktopUlEndReplacement);

    // 3. Revert Book Now in mobile nav
    const mobileBookNowRegex = /<li class="border-b border-gray-200 dark:border-darkBorder py-2"><a href="booking\.html"\s*class="block text-center py-2\.5 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors shadow-sm">Book Now<\/a><\/li>/;
    const mobileBookNowReplacement = `<li class="border-b border-gray-200 dark:border-darkBorder"><a href="booking.html"
          class="block py-3 text-lg font-medium text-gray-900 dark:text-white">Book Now</a></li>`;
    content = content.replace(mobileBookNowRegex, mobileBookNowReplacement);

    // 4. Add Brand CTA to mobile nav (before <li class="pt-6 pb-2">)
    const mobilePt6Regex = /<li class="pt-6 pb-2">/;
    const mobilePt6Replacement = `<li class="border-b border-gray-200 dark:border-darkBorder py-2"><a href="#" class="block text-center py-2.5 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors shadow-sm">Brand</a></li>\n      <li class="pt-6 pb-2">`;
    content = content.replace(mobilePt6Regex, mobilePt6Replacement);

    fs.writeFileSync(filePath, content, 'utf-8');
}

console.log('Update complete.');
