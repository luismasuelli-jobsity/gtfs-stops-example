# gtfs-stops-example
Exercise for Vesputi interview

Installation
------------

This project uses rails 5.2.4 in ruby 2.7.0.

A modern version of PostgreSQL is also needed (tested with 12.1). A dummy setup is done in the database.yml file. Tune the credentials accordingly.

To test this app, just set it up (`rails db:setup`) and then run it (`rails s`) once everything is appropriately setup.

Usage
-----

Hit the root page ("/") and you will see the UI to work it.

The first section allows to upload a stops.txt file (one stops.txt provided by Google is included in this project) with 3 actions:

* Entirely replace the stops dataset with the new file.
* Add these stops to the existing ones (provided there are no repeated stops).
* Clear the current stops dataset.

Then a search can be made in the second interface: the left pane has a marker to drag the center of the search, and the right pane has the results,
which will show the closest 5 results.