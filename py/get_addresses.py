#!/usr/bin/env python3
import csv
import os
import sys
from json import dumps
from pathlib import Path


def get_target_path():
    script_dir = os.path.dirname(os.path.realpath(__file__))
    return os.path.join(script_dir, '..', 'js', 'addresses.js')


def get_addresses_from_csvs(dir):
    addresses = []
    csv.field_size_limit(100000000)
    for entry in os.scandir(dir):
        if entry.path.endswith(".csv") and entry.is_file():
            reader = csv.DictReader(open(entry.path), delimiter='|')
            for row in reader:
                if row['STREET'] and row['CITY'] and row['POSTCODE'] and row['COUNTRY']:
                    address = {}
                    # Address with street name without a house number is allowed
                    for key in ['STREET', 'CITY', 'POSTCODE', 'COUNTRY', 'HOUSENUMBER']:
                        address[key] = row[key]
                    addresses.append(address)
    return addresses


def save_addresses_as_js(addresses):
    with open(get_target_path(), "w", encoding='utf-8') as js_file:
        print("var realAddresses =", file=js_file)
        print(dumps(addresses, ensure_ascii=False) + ';', file=js_file)


def create_js_with_addresses(dir):
    addresses = get_addresses_from_csvs(dir)
    print("Collected '%s' addresses" % len(addresses))
    save_addresses_as_js(addresses)


def main():
    if len(sys.argv) < 2:
        print("Please provide path to directory with OSM csv files with POIs")
    else:
        my_dir = Path(sys.argv[1])
        if my_dir.exists() and my_dir.is_dir():
            create_js_with_addresses(my_dir)
        else:
            print("Either path doesn't exist or isn't a directory")


if __name__ == "__main__":
    main()
