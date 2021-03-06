/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Office} from '../../../services/office/domain/office.model';
import {FetchRequest} from '../../../services/domain/paging/fetch-request.model';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../store';
import {SEARCH} from '../../../store/office/office.actions';

@Component({
  selector: 'fims-customer-offices-form',
  templateUrl: './offices.component.html'
})
export class CustomerOfficesComponent implements OnInit {

  offices: Observable<Office[]>;

  @Input() preSelection: string;

  @Output() onSelectionChange = new EventEmitter<string[]>();

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit(): void {
    this.offices = this.store.select(fromRoot.getOfficeSearchResults)
      .map(officePage => officePage.offices);
  }

  search(searchTerm) {
    const fetchRequest: FetchRequest = {
      searchTerm
    };

    this.store.dispatch({ type: SEARCH, payload: fetchRequest });
  }

  select(selections: string[]): void {
    this.onSelectionChange.emit(selections);
  }

}
