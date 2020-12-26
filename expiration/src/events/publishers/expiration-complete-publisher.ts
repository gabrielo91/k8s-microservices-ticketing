import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@gb-tickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
