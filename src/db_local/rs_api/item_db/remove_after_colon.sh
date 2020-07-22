#!/bin/bash

# Takes a text file that contains lines in the form:
# ITEM_ID: Item_Name

# and formats each line to be:
# ITEM_ID

# Notice the removal of the colon and Item_Name.

sed 's/\:.*/:/' item_ids.txt > changed.txt && mv changed.txt item_ids.txt
sed 's|[:]||g' item_ids.txt > changed.txt && mv changed.txt item_ids.txt