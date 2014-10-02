menu.template = HMENU
menu.template {
	1 = TMENU
	1 {
		wrap = <ul>|</ul>

		# Always unfold all sub-levels of the menu
		expAll = 1

		# Define the normal state (not active, not selected) of menu items
		# Using NO=1 to activate normal state is not necessary, but useful when copying
		NO = 1
		NO {
			# Use the page title field the title property on the A-tag, but only if the navigation title is set
			ATagTitle {
				field = title
				fieldRequired = nav_title
			}

			wrapItemAndSub = <li>|</li>

			# HTML-encode special characters according to the PHP-function htmlSpecialChars
			stdWrap.htmlSpecialChars = 1
		}

		# Copy properties of normal to active state, and then add a CSS class for styling
		ACT < .NO
		ACT {
			ATagParams = class="on"
		}

		# Copy properties of normal to current state, and then add a CSS class for styling
		CUR < .NO
		CUR {
			ATagParams = class="on"
		}
	}
}
